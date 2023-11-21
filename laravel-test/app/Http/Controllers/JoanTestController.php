<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Member;
use Illuminate\Support\Facades\Redis;

class JoanTestController extends Controller
{
    public function test(Request $request)
    {
        $result = array('test'=>"test123");
        // $data = Member::select("acc", "password")->where('mid', '1')->get()->first();
        // $result['db'] = $data;
        // Redis::set('user:profile:' . $data->mid, $data->acc);
        // $result['redis'] = Redis::get('user:profile:' . $data->mid);
        return response()->json($result);
    }
}
