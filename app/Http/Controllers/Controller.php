<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\View\View;

class Controller extends BaseController
{
    public function index() {
        //View::addExtension('html', 'php');
        return view('index');
    }
}
