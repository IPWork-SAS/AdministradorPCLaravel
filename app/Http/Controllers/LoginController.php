<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class LoginController extends Controller
{
    public function login (Request $request){
        $user = User::where('email', $request->email)->where('password', $request->password)->first();
        if($user){
            return 'true';
        }else{
            return 'false';
        }
    }
}
