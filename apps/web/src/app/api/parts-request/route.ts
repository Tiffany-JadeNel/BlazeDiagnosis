import { NextResponse } from "next/server";
import { createPartsRequest } from "@/features/parts/services/parts.service";
import { requireTenantContext } from "@/lib/tenancy/tenant-context";

export async function GET(request: Request) {
  try {
    // Extract tenantId from query string
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return NextResponse.json(
        { error: "Missing required tenantId parameter" },
        { status: 400 }
      );
    }

    // TODO: Query the database for active/non‑archived parts requests
    // Example placeholder response:
    return NextResponse.json(
      { message: "GET parts requests endpoint ready", tenantId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching parts requests:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const tenant = await requireTenantContext();
    const body = await req.json();
    const { jobCardId, notes } = body;

    if (!jobCardId) {
      return NextResponse.json(
        { error: "Missing required jobCardId parameter" },
        { status: 400 }
      );
    }

    const request = await createPartsRequest(tenant.tenantId, jobCardId, notes);
    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Error creating parts request:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
