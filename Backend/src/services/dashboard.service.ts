import Job from "../models/job.model";
import Application from "../models/application.model";
import Company from "../models/company.model";
import { Role } from "../constant/enum";

class DashboardService {
  private async getAdminStats() {
    const jobsCount = await Job.countDocuments();
    const companiesCount = await Company.countDocuments();
    const applicationsCount = await Application.countDocuments();
    
    return {
      jobs: jobsCount,
      companies: companiesCount,
      applications: applicationsCount,
    };
  }

  private async getRecruiterStats(userId: string) {
    const companies = await Company.find({ userId });
    const companyIds = companies.map(c => c._id);
    
    const jobsCount = await Job.countDocuments({ companyId: { $in: companyIds } });
    const jobs = await Job.find({ companyId: { $in: companyIds } }).select("_id");
    const jobIds = jobs.map(j => j._id);
    const applicationsCount = await Application.countDocuments({ jobId: { $in: jobIds } });

    return {
      companies: companies.length,
      jobs: jobsCount,
      applications: applicationsCount,
    };
  }

  private async getCandidateStats(userId: string) {
    const applicationsCount = await Application.countDocuments({ userId });
    return {
      applications: applicationsCount,
    };
  }

  async getStats(user: any) {
    try {
      let stats;
      if (user.role === Role.ADMIN) {
        stats = await this.getAdminStats();
      } else if (user.role === Role.RECRUITER) {
        stats = await this.getRecruiterStats(user._id);
      } else {
        stats = await this.getCandidateStats(user._id);
      }

      return {
        item: stats,
        message: "Dashboard stats retrieved successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to fetch dashboard stats" };
    }
  }
}

export default new DashboardService();
