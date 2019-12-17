<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GraficasController extends Controller
{
    public function Consulta(Request $request){

        $fecha_inicial = $request->initialDate." ".$request->initialTime;
        $fecha_final = $request->finalDate." ".$request->finalTime;
        
        
        $Evento = DB::connection(session('database'))->table('eventos')->where('id', $request->id_event)->first();
        
        $DatosGraficas['genero'] = array();
        $DatosGraficas['ap'] = array();
        $DatosGraficas['paises'] = array();
        $DatosGraficas['edad'] = array();
        $DatosGraficas['os'] = array();
        $DatosGraficas['fecha'] = array();
        
        $DatosGraficas['genero'] = DB::connection(session('database'))
            ->table($Evento->campania)
            ->select(DB::raw('genero, COUNT(*) AS personas'))
            ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('genero')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();
        
        $DatosGraficas['ap'] = DB::connection(session('database'))
            ->table($Evento->campania)
            ->select(DB::raw('ip_ap as ap, COUNT(*) AS personas'))
            ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('ap')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['paises'] = DB::connection(session('database'))
            ->table($Evento->campania.' as pac')
            ->join('paises', 'pac.id_pais',  '=', 'paises.id')
            ->select(DB::raw('paises.nombre_esp as pais, pac.id_pais, COUNT(*) AS personas'))
            ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('pac.id_pais', 'pais')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['edad'] = DB::connection(session('database'))
            ->table($Evento->campania)
            ->select(DB::raw('edad, COUNT(*) AS personas'))
            ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('edad')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['os'] = DB::connection(session('database'))
            ->table($Evento->campania)
            ->select(DB::raw('os, COUNT(*) AS personas'))
            ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('os')
            ->orderBy('personas', 'DESC')
            ->limit(5)
            ->get();

        $DatosGraficas['fecha'] = DB::connection(session('database'))
            ->table($Evento->campania)
            ->select(DB::raw('date(fecha_creacion) as fecha, COUNT(*) AS personas'))
            ->whereBetween('fecha_creacion', [$fecha_inicial,$fecha_final])
            ->groupBy('fecha')
            ->orderBy('fecha', 'ASC')
            ->get();
            
        return response()->json($DatosGraficas, 200);
    }
}
