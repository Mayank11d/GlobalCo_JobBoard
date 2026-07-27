import Job from "../models/job.model";
import Company from "../models/company.model";
import { ApiFeatures } from "../utils/apiFeatures.util";

class JobService {
  async createJob(data: any) {
    try {
      const company = await Company.findById(data.companyId);
      if (!company) {
        return { err: "Company not found" };
      }
      const job = await Job.create(data);
      return {
        item: job,
        message: "Job created successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to create job" };
    }
  }

  async getAllJobs(queryString: any) {
    try {
      const features = new ApiFeatures(Job.find(), queryString)
        .filter()
        .search(["title", "location"])
        .sort()
        .paginate();
        
      const jobs = await features.query;
      return {
        item: jobs,
        message: "Jobs retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch jobs" };
    }
  }

  async getJobById(id: string) {
    try {
      const job = await Job.findById(id);
      if (!job) {
        return { err: "Job not found" };
      }
      return {
        item: job,
        message: "Job retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch job" };
    }
  }

  async updateJob(id: string, data: any) {
    try {
      const job = await Job.findByIdAndUpdate(id, data, { new: true });
      if (!job) {
        return { err: "Job not found" };
      }
      return {
        item: job,
        message: "Job updated successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to update job" };
    }
  }

  async deleteJob(id: string) {
    try {
      const job = await Job.findByIdAndDelete(id);
      if (!job) {
        return { err: "Job not found" };
      }
      return {
        item: null,
        message: "Job deleted successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to delete job" };
    }
  }
}

export default new JobService();
