<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Designation;

class DesignationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $designation = new Designation();
        $designation->name = 'CEO';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'COO';
        $designation->save();

        $designation = new Designation();
        $designation->name = 'CFO';
        $designation->save();
    }
}
