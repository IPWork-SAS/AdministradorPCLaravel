<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use App\Log_Login;
use Browser;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login (Request $request){

        $user = User::where('email', $request->email)->where('password', $request->password)->first();
        
        if($user){

            session(['email' => $request->email]);
            session(['password' => $request->password]);
            session(['id_user' => $user->id]);
            session(['browser' => Browser::browserName()]);
            session(['ip_conection' => $request->ip_public]);
            session(['active' => true ]);

            $log = new Log_Login();
            $log->id_user = session('id_user');
            $log->browser = session('browser');
            $log->ip_conection = session('ip_conection');
            $log->action = 'Login';
            $log->save();


            $user->where("id", $user->id)
                ->update(["conexion" => 1]);
            
            return response()->json($user, 200);

        }else{

            return response()->json($user, 500);

        }
    }

    public function logout (){

        $log = new Log_Login();
        $log->id_user = session('id_user');
        $log->browser = session('browser');
        $log->ip_conection = session('ip_conection');
        $log->action = 'Logout';
        $log->save();

        $user = User::select('id');    
        $user->where('id', session('id_user'))
            ->update(["conexion" => 0]);
        

        session()->forget(['database', 'email', 'password', 'id_user', 'browser', 'ip_conection','active']);
        
        return redirect()->route('home', ['/']);
    }
    
}
