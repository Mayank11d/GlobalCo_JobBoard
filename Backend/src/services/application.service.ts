import Application from "../models/application.model";
import Job from "../models/job.model";
import { ApiFeatures } from "../utils/apiFeatures.util";

class ApplicationService {
  async createApplication(data: any, candidateId: string) {
    try {
      const job = await Job.findById(data.jobId);
      if (!job) {
        return { err: "Job not found" };
      }
      
      const existing = await Application.findOne({ jobId: data.jobId, candidateId });
      if (existing) {
        return { err: "You have already applied for this job" };
      }

      const application = await Application.create({ ...data, candidateId });

      return {
        item: application,
        message: "Application submitted successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to create application" };
    }
  }

  async getApplicationsForJob(jobId: string, queryString: any) {
    try {
      const features = new ApiFeatures(
        Application.find({ jobId }).populate("candidateId", "firstName lastName email avatarUrl headline"),
        queryString
      )
        .filter()
        .sort()
        .paginate();
        
      const applications = await features.query;

      return {
        item: applications,
        message: "Applications retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch applications" };
    }
  }
  
  async getUserApplications(candidateId: string, queryString: any) {
    try {
      const features = new ApiFeatures(
        Application.find({ candidateId }).populate("jobId", "title location jobType workMode status companyId"),
        queryString
      )
        .filter()
        .sort()
        .paginate();
        
      const applications = await features.query;

      return {
        item: applications,
        message: "User applications retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch user applications" };
    }
  }

  // Returns all applications for jobs posted by a recruiter
  async getRecruiterApplications(recruiterId: string, queryString: any) {
    try {
      const jobs = await Job.find({ recruiterId }).select("_id");
      const jobIds = jobs.map((j) => j._id);

      const features = new ApiFeatures(
        Application.find({ jobId: { $in: jobIds } })
          .populate("candidateId", "firstName lastName email avatarUrl headline skills")
          .populate("jobId", "title location jobType workMode status"),
        queryString
      )
        .filter()
        .sort()
        .paginate();

      const applications = await features.query;

      return {
        item: applications,
        message: "Recruiter applications retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch recruiter applications" };
    }
  }

  async updateApplicationStatus(id: string, status: string) {
    try {
      const app = await Application.findByIdAndUpdate(id, { status }, { new: true })
        .populate("candidateId", "firstName lastName email avatarUrl")
        .populate("jobId", "title location");
      if (!app) {
        return { err: "Application not found" };
      }

      return {
        item: app,
        message: "Application status updated successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to update application status" };
    }
  }
}

export default new ApplicationService();
