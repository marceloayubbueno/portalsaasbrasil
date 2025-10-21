import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SaasCompany from '@/lib/models/SaasCompany';

/**
 * GET /api/saas/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const company = await SaasCompany.findById(id).lean();

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empresa SAAS não encontrada',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (error: any) {
    console.error('[API] Erro ao buscar SAAS:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar empresa SAAS',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/saas/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const data = await request.json();

    const company = await SaasCompany.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empresa SAAS não encontrada',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: company,
      message: 'Empresa SAAS atualizada com sucesso',
    });
  } catch (error: any) {
    console.error('[API] Erro ao atualizar SAAS:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao atualizar empresa SAAS',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/saas/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const company = await SaasCompany.findByIdAndDelete(id);

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empresa SAAS não encontrada',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Empresa SAAS deletada com sucesso',
    });
  } catch (error: any) {
    console.error('[API] Erro ao deletar SAAS:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao deletar empresa SAAS',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

