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

export async function POST(requisicao) {

    try {

        const {valor, data, forma, status} = await requisicao.json();

        if (!valor || !forma) {
            return NextResponse.json(
                { error: "Valor e forma obrigatórios." },
                { status: 400 }
            );
        }


        await pool.query(
            `INSERT INTO pagamento (nome_completo, telefone, email, data_nasc, senha_hash)
            VALUES ($1, $2, $3, $4)`,
            [valor, data, forma, status]
        );

         await pool.query(
            `SELECT cod_agendamento FROM agendamento where id = 1$;` [cod_agendamento]

        return NextResponse.json({ message: "Cliente inserido com sucesso" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}