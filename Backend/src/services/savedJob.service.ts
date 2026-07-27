import SavedJob from "../models/savedJob.model";
import Job from "../models/job.model";
import { ApiFeatures } from "../utils/apiFeatures.util";

class SavedJobService {
  async saveJob(jobId: string, userId: string) {
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return { err: "Job not found" };
      }

      const existing = await SavedJob.findOne({ jobId, candidateId: userId });
      if (existing) {
        return { err: "Job is already saved" };
      }

      const savedJob = await SavedJob.create({ jobId, candidateId: userId });
      return {
        item: savedJob,
        message: "Job saved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to save job" };
    }
  }

  async getUserSavedJobs(userId: string, queryString: any) {
    try {
      const features = new ApiFeatures(SavedJob.find({ candidateId: userId }), queryString)
        .filter()
        .sort()
        .paginate();
        
      const savedJobs = await features.query;
      return {
        item: savedJobs,
        message: "Saved jobs retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch saved jobs" };
    }
  }

  async removeSavedJob(id: string, userId: string) {
    try {
      const savedJob = await SavedJob.findOne({ _id: id, candidateId: userId });
      if (!savedJob) {
        return { err: "Saved job not found or you don't have permission" };
      }
      await SavedJob.findByIdAndDelete(id);
      return {
        item: null,
        message: "Saved job removed successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to remove saved job" };
    }
  }
}

export default new SavedJobService();
