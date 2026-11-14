
        let tasks = [];

        // 1. دالة إضافة مهمة جديدة
        function addTask(taskTitle) {
            let newTask = {
                id: Date.now(),
                title: taskTitle,
                completed: false
            };
            tasks.push(newTask);
            renderTasks();
        }

        // 2. دالة حذف مهمة
        function deleteTask(taskId) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
        }

        // 3. دالة تغيير حالة المهمة (خلصت / لسه)
        function toggleTask(taskId) {
            let task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
            }
            renderTasks();
        }

        // 4. دالة تعديل اسم المهمة
        function editTask(taskId, newTitle) {
            let task = tasks.find(t => t.id === taskId);
            if (task) {
                task.title = newTitle;
            }
            renderTasks();
        }

        

        function handleAdd() {
            let input = document.getElementById("taskInput");
            let text = input.value.trim();
            
            if (text !== "") {
                addTask(text);
                input.value = "";
            }
        }

        function handleEdit(taskId, oldTitle) {
            let newTitle = prompt("تعديل المهمة:", oldTitle);
            if (newTitle !== null && newTitle.trim() !== "") {
                editTask(taskId, newTitle.trim());
            }
        }

        function renderTasks() {
            let list = document.getElementById("taskList");
            list.innerHTML = "";

            tasks.forEach(task => {
                let li = document.createElement("li");

                let span = document.createElement("span");
                span.textContent = task.title;
                span.style.cursor = "pointer";
                span.style.textDecoration = task.completed ? "line-through" : "none";
                span.style.color = task.completed ? "#888" : "#000";
                span.onclick = () => toggleTask(task.id);

                let actionsDiv = document.createElement("div");
                actionsDiv.className = "actions";

                let editBtn = document.createElement("button");
                editBtn.textContent = "تعديل";
                editBtn.className = "edit-btn";
                editBtn.onclick = () => handleEdit(task.id, task.title);

                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "حذف";
                deleteBtn.className = "delete-btn";
                deleteBtn.onclick = () => deleteTask(task.id);

                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);

                li.appendChild(span);
                li.appendChild(actionsDiv);
                list.appendChild(li);
            });
        }
    