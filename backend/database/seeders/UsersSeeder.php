<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = new Users();
        $user->firstName = 'Admin';
        $user->lastName = 'Admin';
        $user->username = 'admin';
        $user->password = Hash::make('admin');
        $user->email = 'admin@gmail.com';
        $user->phone = '01700000000';
        $user->employeeId = '0001';
        $user->street = 'Dhaka';
        $user->city = 'Dhaka';
        $user->state = 'Dhaka';
        $user->zipCode = '1200';
        $user->country = 'Bangladesh';
        $user->joinDate = '2021-07-10 00:00:00';
        $user->leaveDate = null;
        $user->bloodGroup = 'A+';
        $user->image = 'admin.jpg';
        $user->departmentId = 1;
        $user->roleId = 1;
        $user->save();
    }
}
