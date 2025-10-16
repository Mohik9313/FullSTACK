 // Data storage
    let students = [];

    // DOM refs
    const table = document.querySelector(".student-table");
    const totalSpan = document.getElementById("total");
    const nameInput = document.getElementById("studentName");
    const marksInput = document.getElementById("studentMarks");

    // Update UI
    function renderTable() {
      // Clear old rows
      table.querySelectorAll("tr:not(:first-child)").forEach(r => r.remove());

      // Add students
      students.forEach(s => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${s.name}</td><td>${s.marks}</td>`;
        table.appendChild(row);
      });

      totalSpan.textContent = students.length;
    }

    // Add student
    function addStudent() {
      const name = nameInput.value.trim();
      const marks = parseInt(marksInput.value);

      if (!name || isNaN(marks) || marks < 0 || marks > 100) {
        alert("Please enter valid name and marks (0-100).");
        return;
      }

      students.push({ name, marks });
      nameInput.value = "";
      marksInput.value = "";
      renderTable();
    }

    // Remove last student
    function removeLast() {
      if (students.length === 0) {
        alert("No students to remove.");
        return;
      }
      students.pop();
      renderTable();
    }

    // Show highest
    function showHighest() {
      if (students.length === 0) {
        alert("No students available.");
        return;
      }
      const top = students.reduce((a, b) => a.marks > b.marks ? a : b);
      alert(`Highest: ${top.name} (${top.marks})`);
    }

    // Show average
    function showAverage() {
      if (students.length === 0) {
        alert("No students available.");
        return;
      }
      const avg = students.reduce((sum, s) => sum + s.marks, 0) / students.length;
      alert(`Average Marks: ${avg.toFixed(2)}`);
    }

    // Sort
    function sortByMarks() {
      students.sort((a, b) => b.marks - a.marks);
      renderTable();
    }

    // Reset
    function resetSample() {
      students = [
        { name: "Alice", marks: 85 },
        { name: "Bob", marks: 72 },
        { name: "Charlie", marks: 90 },
        { name: "David", marks: 60 }
      ];
      renderTable();
    }

    // Event listeners
    document.getElementById("btnAdd").addEventListener("click", addStudent);
    marksInput.addEventListener("keydown", e => {
      if (e.key === "Enter") addStudent();
    });

    document.getElementById("btnHighest").addEventListener("click", showHighest);
    document.getElementById("btnAverage").addEventListener("click", showAverage);
    document.getElementById("btnSort").addEventListener("click", sortByMarks);
    document.getElementById("btnReset").addEventListener("click", resetSample);
    document.getElementById("btnRemove").addEventListener("click", removeLast);

    // Initial
    renderTable();
