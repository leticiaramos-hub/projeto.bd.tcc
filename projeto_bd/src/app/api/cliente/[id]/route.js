import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req, { params }) {
    const { id } = params;

    try {

        // Buscar cliente
        const result = await pool.query(`SELECT * FROM cliente WHERE id = $1;`, [id]);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        return new Response(
            JSON.stringify({ message: "Erro ao buscar consultas." }),
            { status: 500 }
        );
    }


}