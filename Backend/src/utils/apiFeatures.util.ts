import { Query } from "mongoose";

export class ApiFeatures<T> {
  public query: Query<T[], T>;
  public queryString: any;

  constructor(query: Query<T[], T>, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  search(searchFields: string[]) {
    if (this.queryString.search && searchFields.length > 0) {
      const searchRegex = new RegExp(this.queryString.search as string, "i");
      const searchQuery = {
        $or: searchFields.map((field) => ({ [field]: searchRegex })),
      };
      this.query = this.query.find(searchQuery as any);
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = (this.queryString.sort as string).split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page as string, 10) || 1;
    const limit = parseInt(this.queryString.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
