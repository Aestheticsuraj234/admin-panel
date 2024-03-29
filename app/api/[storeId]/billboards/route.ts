import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!userId) return new NextResponse("unauthenticated🔏", { status: 401 });

    if (!label) return new NextResponse("Missing label", { status: 400 });

    if (!imageUrl) return new NextResponse("Missing imageUrl", { status: 400 });

    if(!params.storeId)
    {
        return new NextResponse("Missing storeId", { status: 400 });
    }


    const storeByUserId = await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId:userId
        }
    })

    if(!storeByUserId)
    {
        return new NextResponse("Unauthorized", { status: 403 });
    }


    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 201 });
  } catch (error) {
    console.log(`[Billboards_Post_Error] ${error} [${req.url}]`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function GET(
    req: Request,
    {
      params,
    }: {
      params: { storeId: string };
    }
  ) {
    try {
      
      if(!params.storeId)
      {
          return new NextResponse("Missing storeId", { status: 400 });
      }
      
  
      const billboards = await prismadb.billboard.findMany({
        where: {
          storeId: params.storeId,
        },
      });
  
      return new NextResponse(JSON.stringify(billboards), { status: 201 });
    } catch (error) {
      console.log(`[Billboards_Get_Error] ${error} [${req.url}]`);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }