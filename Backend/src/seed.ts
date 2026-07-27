import "dotenv/config";
import mongoose from "mongoose";
import { env } from "./config/env.config";
import connectDB from "./config/db.config";
import User from "./models/user.model";
import Company from "./models/company.model";
import Job from "./models/job.model";
import { Role, JobType, WorkMode, JobStatus } from "./constant/enum";
import bcrypt from "bcryptjs";

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to database for seeding...");

    const passwordHash = await bcrypt.hash("Password123!", 10);

    // 1. Seed Admin
    let admin = await User.findOne({ email: "admin@jobboard.com" });
    if (!admin) {
      admin = await User.create({
        firstName: "Super",
        lastName: "Admin",
        email: "admin@jobboard.com",
        passwordHash,
        role: Role.ADMIN,
      });
      console.log("Admin user seeded successfully!");
    } else {
      console.log("Admin user already exists.");
    }

    // 2. Seed Candidate
    let candidate = await User.findOne({ email: "candidate@example.com" });
    if (!candidate) {
      candidate = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "candidate@example.com",
        passwordHash,
        role: Role.CANDIDATE,
        skills: ["JavaScript", "React", "Node.js"],
        headline: "Full Stack Developer",
      });
      console.log("Candidate user seeded successfully!");
    } else {
      console.log("Candidate user already exists.");
    }

    // 3. Seed Recruiter
    let recruiter = await User.findOne({ email: "recruiter@example.com" });
    if (!recruiter) {
      recruiter = await User.create({
        firstName: "Jane",
        lastName: "Smith",
        email: "recruiter@example.com",
        passwordHash,
        role: Role.RECRUITER,
      });
      console.log("Recruiter user seeded successfully!");
    } else {
      console.log("Recruiter user already exists.");
    }

    // 4. Seed Company
    let company = await Company.findOne({ name: "Tech Innovations Inc" });
    if (!company && recruiter) {
      company = await Company.create({
        name: "Tech Innovations Inc",
        description: "A leading company in AI and Web development.",
        location: "San Francisco, CA",
        website: "https://techinnovations.example.com",
        ownerId: recruiter._id,
      });
      console.log("Company seeded successfully!");
    } else {
      console.log("Company already exists.");
    }

    // 5. Seed Jobs
    const jobsCount = await Job.countDocuments();
    if (jobsCount === 0 && company && recruiter) {
      await Job.insertMany([
        {
          title: "Senior Frontend Engineer",
          description: "We are looking for an experienced Frontend Engineer to join our team. You will be working with React, TypeScript, and modern tools to build scalable interfaces.",
          requirements: ["5+ years React experience", "TypeScript proficiency", "Tailwind CSS"],
          salaryMin: 120000,
          salaryMax: 160000,
          location: "San Francisco, CA",
          jobType: JobType.FULL_TIME,
          workMode: WorkMode.HYBRID,
          status: JobStatus.PUBLISHED,
          companyId: company._id,
          recruiterId: recruiter._id,
        },
        {
          title: "Backend Developer (Node.js)",
          description: "Join our backend team to build scalable microservices and APIs supporting high traffic applications.",
          requirements: ["Node.js", "Express", "MongoDB", "Redis", "Microservices architecture"],
          salaryMin: 100000,
          salaryMax: 140000,
          location: "Remote",
          jobType: JobType.FULL_TIME,
          workMode: WorkMode.REMOTE,
          status: JobStatus.PUBLISHED,
          companyId: company._id,
          recruiterId: recruiter._id,
        },
        {
          title: "UI/UX Designer",
          description: "Help us design beautiful and intuitive user interfaces. Work closely with product and engineering teams.",
          requirements: ["Figma", "Prototyping", "User Research", "Portfolio of recent work"],
          salaryMin: 90000,
          salaryMax: 120000,
          location: "New York, NY",
          jobType: JobType.CONTRACT,
          workMode: WorkMode.ONSITE,
          status: JobStatus.PUBLISHED,
          companyId: company._id,
          recruiterId: recruiter._id,
        }
      ]);
      console.log("Jobs seeded successfully!");
    } else {
      console.log("Jobs already exist or prerequisites (company/recruiter) missing.");
    }

    console.log("Seeding process finished!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
