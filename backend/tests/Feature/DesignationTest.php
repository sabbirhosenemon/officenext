<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Factory;

class DesignationTest extends TestCase
{
    function get_token(): string
    {
        $response = $this->post('/user/login', [
            'username' => 'admin',
            'password' => 'admin'
        ]);

        return $response->json()['token'];
    }

    public function test_create_designation(): void
    {
        $faker = Factory::create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->post('/designation', [
                    'name' => $faker->name,
                ]);

        $response->assertStatus(201);
    }

    public function test_get_all_designation(): void
    {

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->get('/designation?query=all');

        $response->assertStatus(200);
    }

    public function test_get_single_designation(): void
    {

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->get('/designation/1');

        $response->assertStatus(200);
    }

    public function test_update_designation(): void
    {
        $faker = Factory::create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->put('/designation/1', [
                    'name' => $faker->name,
                ]);

        $response->assertStatus(200);
    }


    public function test_delete_designation(): void
    {
        $faker = Factory::create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->get_token()
        ])->put('/designation/2', [
                    'status' => 'false',
                ]);

        $response->assertStatus(200);
    }
}
