export default function ResumeUploadPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Resume Upload
      </h1>

      <div className="mt-6 border rounded-lg p-6">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  );
}