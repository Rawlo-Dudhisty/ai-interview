-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);
