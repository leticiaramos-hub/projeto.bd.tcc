import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(){
    try {

        const result = await pool.query(`SELECT * FROM agendamento ORDER BY cod_agendamento ASC;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(requisicao) {

    try {

        const {data, hora_inicio , hora_termino , status} = await requisicao.json();

        if (!data || !hora_inicio) {
            return NextResponse.json(
                { error: "data e hora_inicio obrigatórios." },
                { status: 400 }
            );
        }


        await pool.query(
            `INSERT INTO agendamento (data, hora_inicio , hora_termino , status)
            VALUES ($1, $2, $3, $4)`,
            [data, hora_inicio , hora_termino , status]
        );

        await pool.query(
             `SELECT cod_cliente FROM cliente where id = 1$;`, [cod_cliente]
        );
        await pool.query(
            `SELECT cod_servico FROM servico where id = 1$;`,[cod_servico]
        );
        await pool.query(
            `SELECT cod_proprietaria FROM proprietaria where id = 1$;`,[cod_proprietaria]
        );
        await pool.query(
             `SELECT id FROM horario_disponivel where id = 1$;`[cod_horario]
        );

        return NextResponse.json({ message: "Cliente inserido com sucesso" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}