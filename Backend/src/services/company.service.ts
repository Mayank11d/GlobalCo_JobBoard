import Company from "../models/company.model";
import { ApiFeatures } from "../utils/apiFeatures.util";

class CompanyService {
  async createCompany(data: any, ownerId: string) {
    try {
      const company = await Company.create({ ...data, ownerId });
      return {
        item: company,
        message: "Company created successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to create company" };
    }
  }

  async getAllCompanies(queryString: any) {
    try {
      const features = new ApiFeatures(Company.find(), queryString)
        .filter()
        .search(["name", "location"])
        .sort()
        .paginate();
        
      const companies = await features.query;
      return {
        item: companies,
        message: "Companies retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch companies" };
    }
  }

  async getMyCompany(ownerId: string) {
    try {
      const company = await Company.findOne({ ownerId });
      // It's ok if there's no company yet — return null item
      return {
        item: company || null,
        message: company ? "Company retrieved successfully" : "No company found",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch company" };
    }
  }

  async getCompanyById(id: string) {
    try {
      const company = await Company.findById(id);
      if (!company) {
        return { err: "Company not found" };
      }
      return {
        item: company,
        message: "Company retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch company" };
    }
  }

  async updateCompany(id: string, data: any) {
    try {
      const company = await Company.findByIdAndUpdate(id, data, { new: true });
      if (!company) {
        return { err: "Company not found" };
      }
      return {
        item: company,
        message: "Company updated successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to update company" };
    }
  }

  async deleteCompany(id: string) {
    try {
      const company = await Company.findByIdAndDelete(id);
      if (!company) {
        return { err: "Company not found" };
      }
      return {
        item: null,
        message: "Company deleted successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to delete company" };
    }
  }
}

export default new CompanyService();
