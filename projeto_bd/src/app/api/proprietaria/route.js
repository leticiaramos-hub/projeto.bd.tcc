import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(){
    try {

        const result = await pool.query(`SELECT * FROM proprietaria ORDER BY cod_proprietaria ASC;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function POST(requisicao) {

    try {

        const { nome_completo, telefone, email, data_nasc, senha_hash} = await requisicao.json();

        if (!nome_completo || !telefone || !email || !data_nasc || !senha_hash) {
            return NextResponse.json(
                { error: "Campos obrigatórios: nome_completo, telefone, email, data_nasc, senha_hash" },
                { status: 400 }
            );
        }


        await pool.query(
            `INSERT INTO proprietaria (nome_completo, telefone, email, data_nasc, senha_hash)
            VALUES ($1, $2, $3, $4, $5)`,
            [nome_completo, telefone, email, data_nasc, senha_hash]
        );

        return NextResponse.json({ message: "Cliente inserido com sucesso" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}