-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
