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

export async function POST(requisicao) {

    try {

        const {dia_semana, hora_inicio, hora_fim, disponibilidade} = await requisicao.json();

        if (!dia_semana || !hora_inicio) {
            return NextResponse.json(
                { error: "Dia e hora obrigatórios." },
                { status: 400 }
            );
        }


        await pool.query(
            `INSERT INTO horario_disponivel (dia_semana, hora_inicio, hora_fim, disponibilidade)
            VALUES ($1, $2, $3, $4)`,
            [dia_semana, hora_inicio, hora_fim, disponibilidade]
            `SELECT id FROM proprietaria where cod_proprietaria ASC;`
        );

        return NextResponse.json({ message: "Cliente inserido com sucesso" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}