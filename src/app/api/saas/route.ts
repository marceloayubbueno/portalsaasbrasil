import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SaasCompany from '@/lib/models/SaasCompany';

/**
 * GET /api/saas
 * Lista todas as empresas SAAS com filtros
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status') || 'ativo';

    // Construir query
    const query: any = { status };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Buscar empresas SAAS
    const companies = await SaasCompany.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: companies,
      count: companies.length,
    });
  } catch (error: any) {
    console.error('[API] Erro ao buscar SAAS:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar empresas SAAS',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/saas
 * Cria uma nova empresa SAAS (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Validações básicas
    if (!data.name || !data.slug || !data.description || !data.website || !data.category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dados obrigatórios faltando',
        },
        { status: 400 }
      );
    }

    // Criar empresa SAAS
    const company = await SaasCompany.create(data);

    return NextResponse.json(
      {
        success: true,
        data: company,
        message: 'Empresa SAAS criada com sucesso',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API] Erro ao criar SAAS:', error);
    
    // Erro de duplicação de slug
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug já existe',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao criar empresa SAAS',
        message: error.message,
      },
      { status: 500 }
    );
  }
}



