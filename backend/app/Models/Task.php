<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    protected $table = 'task';
    protected $primaryKey = 'id';
    protected $fillable = [
        'projectId',
        'milestoneId',
        'priorityId',
        'taskStatusId',
        'name',
        'startDate',
        'endDate',
        'completionTime',
        'description',
        'status'

    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'projectId');
    }

    public function milestone(): BelongsTo
    {
        return $this->belongsTo(Milestone::class, 'milestoneId');
    }

    public function priority(): BelongsTo
    {
        return $this->belongsTo(Priority::class, 'priorityId');
    }

    public function taskStatus(): BelongsTo
    {
        return $this->belongsTo(TaskStatus::class, 'taskStatusId');
    }
}
