<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Users extends Model
{
    use HasFactory;

    //create user model
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $fillable = [
        'firstName',
        'lastName',
        'username',
        'password',
        'email',
        'phone',
        'employeeId',
        'street',
        'city',
        'state',
        'zipCode',
        'country',
        'joinDate',
        'leaveDate',
        'bloodGroup',
        'image',
        'departmentId',
        'roleId',
    ];


    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'departmentId');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'roleId');
    }

    //designationHistory
    public function designationHistory(): HasMany
    {
        return $this->hasMany(DesignationHistory::class, 'userId');
    }

    //relation with project
    public function project(): HasMany
    {
        return $this->hasMany(Project::class, 'projectManagerId');
    }
}
