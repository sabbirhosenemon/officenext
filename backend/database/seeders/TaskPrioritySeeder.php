<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taskPriority = new Priority();
        $taskPriority->name = 'Low';
        $taskPriority->save();

        $taskPriority = new Priority();
        $taskPriority->name = 'Medium';
        $taskPriority->save();

        $taskPriority = new Priority();
        $taskPriority->name = 'High';
        $taskPriority->save();
    }
}
