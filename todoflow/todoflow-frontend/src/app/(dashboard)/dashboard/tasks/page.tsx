"use client";

import { useState } from "react";
import { Plus, ListTodo } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useTasks } from "../../../../hooks/useTasks";
import { useDebounce } from "../../../../hooks/useDebounce";
import TaskCard from "../../../../components/tasks/TaskCard";
import TaskModal from "../../../../components/tasks/TaskModal";
import TaskSearchBar from "../../../../components/tasks/TaskSearchBar";
import TaskFilters from "../../../../components/tasks/TaskFilters";
import TaskSortMenu from "../../../../components/tasks/TaskSortMenu";
import LoadingSkeleton from "../../../../components/shared/LoadingSkeleton";
import EmptyState from "../../../../components/shared/EmptyState";
import type { Task, Priority, TaskStatus } from "../../../../types/task";
import type { TaskQuery } from "../../../../lib/api/tasks";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [status, setStatus] = useState<TaskStatus | undefined>();
  const [priority, setPriority] = useState<Priority | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<TaskQuery["sortBy"]>("createdAt");
  const [order, setOrder] = useState<TaskQuery["order"]>("desc");

  const { data: tasks, isLoading } = useTasks({
    search: debouncedSearch || undefined,
    status,
    priority,
    categoryId,
    sortBy,
    order,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const hasFilters = !!(search || status || priority || categoryId);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">My Tasks</h1>
          <p className="text-sm text-muted-foreground">
            {tasks?.length ?? 0} task{tasks?.length === 1 ? "" : "s"}
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <TaskSearchBar value={search} onChange={setSearch} />
        <div className="flex flex-wrap items-center gap-2">
          <TaskFilters
            status={status}
            priority={priority}
            categoryId={categoryId}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onCategoryChange={setCategoryId}
          />
          <TaskSortMenu
            sortBy={sortBy}
            order={order}
            onChange={(newSortBy, newOrder) => {
              setSortBy(newSortBy);
              setOrder(newOrder);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton count={4} />
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={openEdit} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState
          icon={ListTodo}
          title={hasFilters ? "No tasks match your filters" : "No tasks yet"}
          description={hasFilters ? "Try adjusting your search or filters." : "Create your first task to get started."}
        />
      )}

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={editingTask} />
    </div>
  );
}