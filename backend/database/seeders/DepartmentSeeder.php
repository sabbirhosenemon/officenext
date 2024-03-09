<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $department = new Department();
        $department->name = 'Admin';
        $department->save();

        $department = new Department();
        $department->name = 'HR';
        $department->save();

        $department = new Department();
        $department->name = 'IT';
        $department->save();

        $department = new Department();
        $department->name = 'Marketing';
        $department->save();

        $department = new Department();
        $department->name = 'Sales';
        $department->save();

        $department = new Department();
        $department->name = 'Accounting';
        $department->save();

        $department = new Department();
        $department->name = 'Production';
        $department->save();

        $department = new Department();
        $department->name = 'Logistics';
        $department->save();

        $department = new Department();
        $department->name = 'Customer Service';
        $department->save();

        $department = new Department();
        $department->name = 'Research and Development';
        $department->save();

        $department = new Department();
        $department->name = 'Quality Assurance';
        $department->save();

        $department = new Department();
        $department->name = 'Purchasing';
        $department->save();

        $department = new Department();
        $department->name = 'Legal';
        $department->save();

        $department = new Department();
        $department->name = 'Facilities';
        $department->save();

        $department = new Department();
        $department->name = 'Security';
        $department->save();

        $department = new Department();
        $department->name = 'Management';
        $department->save();
    }
}
