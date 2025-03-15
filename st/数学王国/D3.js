function initGroupVisualization() {
    // 创建群元素的可视化
    const svg = d3.select("#group-visualization")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 400 300");
    
    // 获取当前选择的群类型
    const groupType = document.getElementById("group-type").value;
    const groupSize = parseInt(document.getElementById("group-size").value);
    
    // 根据群类型生成元素
    let elements = [];
    if (groupType === "cyclic") {
        // 生成循环群元素
        for (let i = 0; i < groupSize; i++) {
            elements.push({
                id: i,
                name: `g${i}`,
                color: d3.interpolateRainbow(i / groupSize)
            });
        }
    } else if (groupType === "dihedral") {
        // 生成二面体群元素
        for (let i = 0; i < groupSize; i++) {
            elements.push({
                id: i,
                name: `r${i}`,
                color: d3.interpolateBlues((i + 1) / groupSize)
            });
        }
        for (let i = 0; i < groupSize; i++) {
            elements.push({
                id: i + groupSize,
                name: `s${i}`,
                color: d3.interpolateReds((i + 1) / groupSize)
            });
        }
    }
    
    // 计算元素位置（圆形布局）
    const radius = 120;
    const centerX = 200;
    const centerY = 150;
    
    elements.forEach((el, i) => {
        const angle = (2 * Math.PI * i) / elements.length;
        el.x = centerX + radius * Math.cos(angle);
        el.y = centerY + radius * Math.sin(angle);
    });
    
    // 绘制元素
    const nodes = svg.selectAll(".group-element")
        .data(elements)
        .enter()
        .append("g")
        .attr("class", "group-element")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .on("click", function(event, d) {
            // 点击元素时显示其性质
            document.getElementById("selected-element").textContent = d.name;
            updateCayleyTable(d.id);
        });
    
    nodes.append("circle")
        .attr("r", 20)
        .attr("fill", d => d.color)
        .attr("stroke", "#333")
        .attr("stroke-width", 2);
    
    nodes.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .text(d => d.name);
    
    // 初始化凯莱表
    updateCayleyTable(0);
}

function updateCayleyTable(selectedElement) {
    const groupType = document.getElementById("group-type").value;
    const groupSize = parseInt(document.getElementById("group-size").value);
    
    // 生成凯莱表
    const tableContainer = document.getElementById("cayley-table");
    tableContainer.innerHTML = "";
    
    const table = document.createElement("table");
    table.className = "w-full text-center border-collapse";
    
    // 创建表头
    const thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    
    // 空单元格（左上角）
    headerRow.appendChild(document.createElement("th"));
    
    // 列标题
    for (let i = 0; i < groupSize; i++) {
        const th = document.createElement("th");
        th.className = "px-2 py-1 bg-indigo-100 dark:bg-indigo-900 border";
        th.textContent = groupType === "cyclic" ? `g${i}` : (i < groupSize/2 ? `r${i}` : `s${i-groupSize/2}`);
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 创建表体
    const tbody = document.createElement("tbody");
    
    for (let i = 0; i < groupSize; i++) {
        const row = document.createElement("tr");
        
        // 行标题
        const th = document.createElement("th");
        th.className = "px-2 py-1 bg-indigo-100 dark:bg-indigo-900 border";
        th.textContent = groupType === "cyclic" ? `g${i}` : (i < groupSize/2 ? `r${i}` : `s${i-groupSize/2}`);
        row.appendChild(th);
        
        // 单元格（群操作结果）
        for (let j = 0; j < groupSize; j++) {
            const td = document.createElement("td");
            td.className = "px-2 py-1 border";
            
            // 计算群操作结果
            let result;
            if (groupType === "cyclic") {
                // 循环群：加法模n
                result = `g${(i + j) % groupSize}`;
            } else if (groupType === "dihedral") {
                // 二面体群：旋转和反射的组合
                // 这里是简化实现
                if (i < groupSize/2 && j < groupSize/2) {
                    // 旋转 * 旋转
                    result = `r${(i + j) % (groupSize/2)}`;
                } else if (i >= groupSize/2 && j >= groupSize/2) {
                    // 反射 * 反射
                    result = `r${(i - j) % (groupSize/2)}`;
                } else if (i < groupSize/2 && j >= groupSize/2) {
                    // 旋转 * 反射
                    result = `s${(i + j) % (groupSize/2)}`;
                } else {
                    // 反射 * 旋转
                    result = `s${(i - j) % (groupSize/2)}`;
                }
            }
            
            td.textContent = result;
            
            // 高亮显示与选中元素相关的单元格
            if (i === selectedElement || j === selectedElement) {
                td.className += " bg-indigo-50 dark:bg-indigo-900/30";
            }
            
            row.appendChild(td);
        }
        
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}