let curTotalIssues = document.getElementById('total-issues');

const loadAllIssues = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Something went wrong ${res.status}`)
        }
        const data = await res.json();
        displayAllIssues(data.data);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

const displayAllIssues = (issues) => {
    curTotalIssues.innerText = `${issues.length} Issues`;
    issues.forEach(issue => {
        console.log(issue);
        const container = document.querySelector('.card-container');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('bg-base-100', 'w-full', 'shadow-sm', 'border-t-4', `${issue.status.toLowerCase() === 'open' ? 'border-t-green-400' : 'border-t-purple-400'}`,'p-4');

        cardDiv.innerHTML = `
        <div class="status-priority flex justify-between items-center">
                    <span class="status w-8 h-8 rounded-full">
                        ${issue.status==='open' ? "<img src='assets/Open-Status.png' alt='open-status' class='w-8 h-8 object-contain'>" : "<img src='assets/Closed-Status.png' alt='closed-status' class='w-8 h-8 object-contain'>"}
            
                    </span>

                    <span
                        class="uppercase inline-block flex justify-center items-center ${issue.priority.toLowerCase() === 'high' ? 'text-[#EF4444] bg-[#FEECEC]' : issue.priority.toLowerCase() === 'medium' ? 'text-[#F59E0B] bg-[#FFF6D1]' : 'text-[#9CA3AF] bg-[#EEEFF2]'} rounded-[100px] px-8 py-2">
                        ${issue.priority}
                    </span>

                </div>

                <div class="title-desc space-y-[12px] mt-[12px]">
                    <p class="title capitalize text-xl font-bold">${issue.title}</p>
                    <p
                        class="desc text-[#64748B] text-[12px] text-left line-clamp-1 overflow-hidden text-clip-ellipses">
                        ${issue.description}</p>
                    <div class="labels ${(!issue.labels || issue.labels.length === 0) ? 'hidden' : 'flex'} gap-1 border-b-4 border-b-white pb-[16px]">

                        <div class="${issue.labels[0] === undefined ? 'hidden' : 'flex'}  rounded-[100px] px-2 py-2 text-sm bg-[#FEECEC] text-[#EF4444]">
                            <span>
                                <i class="fa-solid fa-bug"></i>
                            </span>
                            <span class="label-0 uppercase ">
                                ${issue.labels[0] || ''}</span>
                        </div>
                        <div class="${issue.labels[1] === undefined ? 'hidden' : 'flex'}  gap-1 justify-center items-center rounded-[100px] px-2 py-2 text-sm bg-[#FDE68A] text-[#D97706]">
                            <span>
                                <i class="fa-solid fa-life-ring"></i>
                            </span>
                        <span
                            class="label-1 uppercase">
                            ${issue.labels[1] || ''}</span>
                        </div>
                    </div>
                </div>

                <div class="authorship p-[16px] text-[#64748B]  border-t-2 border-t-gray-200">
                    <p>#1 by ${issue.author}</p>
                    <p class="date">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>`;
        container.appendChild(cardDiv);

    })

}

loadAllIssues();
