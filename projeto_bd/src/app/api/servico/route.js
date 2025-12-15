import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(){
    try {

        const result = await pool.query(`SELECT * FROM servico ORDER BY cod_servico ASC;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(requisicao) {

    try {

        const {nome, descricao, duracao, preco, categoria} = await requisicao.json();

        if (!nome_completo || !email) {
            return NextResponse.json(
                { error: "Nome e e-mail obrigatórios." },
                { status: 400 }
            );
        }


        await pool.query(
            `INSERT INTO proprietaria (nome, descricao, duracao, preco, categoria)
            VALUES ($1, $2, $3, $4, $5)`,
            [nome, descricao, duracao, preco, categoria]
            
        );

        return NextResponse.json({ message: "Cliente inserido com sucesso" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}