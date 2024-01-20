import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      billboardId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("unauthenticated🔏", { status: 401 });

    if (!label) return new NextResponse("Missing label", { status: 400 });

    if (!imageUrl) return new NextResponse("Missing imageUrl", { status: 400 });

    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 201 });
  } catch (error) {
    console.log(`[BILLBOARD_PATCH] ${error} [${req.url}]`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("unauthenticated🔏", { status: 401 });

    if (!params.billboardId)
      return new NextResponse("Missing billboardId", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,

      },
    });


    return new NextResponse(JSON.stringify(billboard), { status: 201 });
  } catch (error) {
    console.log(`[BILLBOARD_DELETE] ${error} [${req.url}]`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function GET(
    req: Request,
    { params }: { params: {billboardId: string } }
  ) {
    try {
     

  
      const billboard = await prismadb.billboard.findUnique({
        where: {
          id: params.billboardId,
        },
      });
  
  
      return new NextResponse(JSON.stringify(billboard), { status: 201 });
    } catch (error) {
      console.log(`[BILLBOARD_GET] ${error} [${req.url}]`);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }


