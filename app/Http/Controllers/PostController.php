<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Carbon\Carbon;

class PostController extends BaseController
{
    public function create(Request $request) {
        $req = $request->all();
        foreach ($req as $key => $value) {
            if(!$value) return json_encode(['error' => 'Заполните все поля']);
            $req[$key] = strip_tags($value);
            $req[$key] = htmlspecialchars($req[$key], ENT_QUOTES);
        }
        Post::create($req);
        return json_encode(['success' => true]);
    }
    public function getPosts(){
        $res = Post::orderBy('created_at', 'asc')->get()->toArray();
        foreach ($res as $key => $value) {
             $res[$key]['date'] = Carbon::createFromFormat('Y-m-d H:i:s', $res[$key]['created_at'])->format('Y.d.m H:i:s');

        }
        return json_encode($res);
    }
}
