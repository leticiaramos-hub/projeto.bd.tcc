import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(){
    try {

        const result = await pool.query(`SELECT * FROM horario_disponivel ORDER BY cod_horario ASC;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}