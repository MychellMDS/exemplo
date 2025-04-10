<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index(){
        $produtos = Produto::all()->orderby('nome');
        return view ( 'paginas.index',$produtos);
    }
}
