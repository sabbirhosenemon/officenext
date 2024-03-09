<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    use HasFactory;
    protected $table = 'designation';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
    ];

    public function designationHistory()
    {
        return $this->hasMany(DesignationHistory::class, 'designationId');
    }
}
