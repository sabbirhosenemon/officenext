<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Testing\Fakes\Fake;
use Tests\TestCase;
use Faker\Factory;

class AuthenticationTest extends TestCase
{
    function get_token(): string
    {
        $response = $this->post('/user/login', [
            'username' => 'admin',
            'password' => 'admin'
        ]);

        return $response->json()['token'];
    }

    public function test_user_login(): void
    {
        $response = $this->post('/user/login', [
            'username' => 'admin',
            'password' => 'admin'
        ]);

        $response->assertStatus(200);
    }

    public function test_user_registration(): void
    {
        $faker = Factory::create();

        $response = $this->post('/user/register', [
            'firstName' => $faker->name,
            'lastName' => $faker->name,
            'username' => $faker->name,
            'password' => 'johndoe',
            'email' => $faker->email,
            'phone' => $faker->phoneNumber,
            'street' => '1234 Main St',
            'city' => 'City',
            'state' => 'State',
            'zipCode' => '12345',
            'country' => 'Country',
            'joinDate' => "2024-03-27T15:50:20.155Z",
            'employeeId' => $faker->randomNumber(5),
            'bloodGroup' => 'A+',
            'departmentId' => 1,
            'roleId' => 1,
            'designationId' => 1,
            'designationStartDate' => "2024-03-27T15:50:20.155Z",
            'education' => [],
        ]);

        $response->assertStatus(201);
    }

    public function test_get_all_users(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->get('user?query=all');

        $response->assertStatus(200);
    }

    public function test_get_single_user(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->get('user/1');

        $response->assertStatus(200);
    }

    public function test_update_user(): void
    {
        $faker = Factory::create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->put('user/2', [
                    'firstName' => $faker->name,
                    'lastName' => $faker->name,
                    'username' => $faker->name,
                    'password' => 'johndoe',
                    'email' => $faker->email,
                    'phone' => $faker->phoneNumber,
                    'street' => '1234 Main St',
                    'city' => 'City',
                    'state' => 'State',
                    'zipCode' => '12345',
                    'country' => 'Country',
                    'joinDate' => "2024-03-27T15:50:20.155Z",
                    'employeeId' => $faker->randomNumber(5),
                    'bloodGroup' => 'A+',
                    'departmentId' => 1,
                    'roleId' => 1,
                    'designationId' => 1,
                    'designationStartDate' => "2024-03-27T15:50:20.155Z",
                    'education' => [],
                ]);

        $response->assertStatus(200);
    }

    public function test_delete_user(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->patch('user/2', [
                    'status' => 'false'
                ]);

        $response->assertStatus(200);

    }
}
