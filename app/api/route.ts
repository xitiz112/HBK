import { json } from "@/lib/api";
import { publicResourceKeys } from "@/lib/api-resources";

export async function GET() {
  return json({
    name: "HBK & Associates API",
    resources: publicResourceKeys.map((resource) => `/api/${resource}`),
    endpoints: {
      home: "GET /api/home",
      contact: "POST /api/contact",
      item: "GET /api/{resource}/{id}",
      adminLogin: "POST /api/admin/login",
      adminMe: "GET /api/admin/me",
      adminResource: "GET|POST|PUT /api/admin/{resource}",
      adminItem: "GET|PUT|DELETE /api/admin/{resource}/{id}",
      adminUpload: "POST /api/admin/upload",
      submissions: "GET /api/admin/submissions",
      submissionItem: "GET|PATCH|DELETE /api/admin/submissions/{id}",
    },
  });
}
