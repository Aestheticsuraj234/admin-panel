import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES] [PATCH] [/stores/[storeId]/route.ts] error: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(_req:Request,{ params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES] [DELETE] [/stores/[storeId]/route.ts] error: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
