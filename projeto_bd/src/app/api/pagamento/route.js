import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(){
    try {

        const result = await pool.query(`SELECT * FROM pagamento ORDER BY cod_pagamento ASC;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}