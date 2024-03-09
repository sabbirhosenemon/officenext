<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssignedTask extends Model
{
    use HasFactory;
    protected $table = 'assignedTask';
    protected $primaryKey = 'id';
    protected $fillable = [
        'taskId',
        'userId',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'taskId');
    }
}
