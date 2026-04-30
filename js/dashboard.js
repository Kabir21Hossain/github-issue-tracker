let curTotalIssues = document.getElementById('total-issues');
const allBtn = document.getElementById('allBtn');
const openBtn = document.getElementById('openBtn');
const closedBtn = document.getElementById('closedBtn');
const container = document.querySelector('.card-container');
const loader = document.querySelector('#loading');
const logoutBtn = document.getElementById('logOutBtn');
const searchBox = document.getElementById('srcBox');
const searchBtn = document.getElementById('srcNewIssue');
const modalBox = document.getElementById('modal-box');

const btnsId = ['allBtn', 'openBtn', 'closedBtn'];
let allFetchedIssues = [];

const renderIssues = (issues) => {
    loader.classList.add('hidden');
    container.innerHTML = "";
    curTotalIssues.innerText = `${issues.length} Issues`;

    issues.forEach(issue => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('bg-base-100', 'w-full', 'shadow-sm', 'border-t-4', `${issue.status.toLowerCase() === 'open' ? 'border-t-green-400' : 'border-t-purple-400'}`, 'p-4');

        cardDiv.innerHTML = `
        <div class="status-priority flex justify-between items-center">
                    <span class="status w-8 h-8 rounded-full">
                        ${issue.status.toLowerCase() === 'open' ? "<img src='assets/Open-Status.png' alt='open-status' class='w-8 h-8 object-contain'>" : "<img src='assets/Closed-Status.png' alt='closed-status' class='w-8 h-8 object-contain'>"}
            
                    </span>

                    <span
                        class="uppercase  flex justify-center items-center ${issue.priority.toLowerCase() === 'high' ? 'text-[#EF4444] bg-[#FEECEC]' : issue.priority.toLowerCase() === 'medium' ? 'text-[#F59E0B] bg-[#FFF6D1]' : 'text-[#9CA3AF] bg-[#EEEFF2]'} rounded-[100px] px-8 py-2">
                        ${issue.priority}
                    </span>

                </div>

                <div class="title-desc space-y-[12px] mt-[12px]">
                    <p class="title capitalize text-xl font-bold">${issue.title}</p>
                    <p
                        class="desc text-[#64748B] text-[12px] text-left line-clamp-1 overflow-hidden text-clip-ellipses">
                        ${issue.description}</p>
                    <div class="labels ${(!issue.labels || issue.labels.length === 0) ? 'hidden' : 'flex'} gap-1 border-b-4 border-b-white pb-[16px]">

                        <div class="${issue.labels[0] === undefined ? 'hidden' : 'flex'}  rounded-[100px] px-2 py-2 text-sm ${issue.labels[0]?.toLowerCase() === 'bug' ? 'bg-[#FEECEC] text-[#EF4444]' : issue.labels[0]?.toLowerCase() === 'help wanted' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#BBF7D0] text-[#00A96E]'}">
                           
                            <span>${issue.labels[0]?.toLowerCase() === 'bug' ? '<i class="fa-solid fa-bug"></i>' : issue.labels[0]?.toLowerCase() === 'help wanted' ? '<i class="fa-solid fa-life-ring"></i>' : issue.labels[0]?.toLowerCase() === 'documentation' ? '<i class="fa-solid fa-file"></i>' : '<img width="20" height="20" src="https://img.icons8.com/softteal-color/24/filled-star.png" alt="filled-star"/>'}
                            </span>
                            <span class="label-0 uppercase ">
                                ${issue.labels[0] || ''}</span>
                        </div>
                        <div class="${issue.labels[1] === undefined ? 'hidden' : 'flex'}  gap-1 justify-center items-center rounded-[100px] px-2 py-2 text-sm ${issue.labels[1]?.toLowerCase() === 'bug' ? 'bg-[#FEECEC] text-[#EF4444]' : issue.labels[1]?.toLowerCase() === 'help wanted' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#BBF7D0] text-[#00A96E]'}">
                                                        <span>${issue.labels[1]?.toLowerCase() === 'bug' ? '<i class="fa-solid fa-bug"></i>' : issue.labels[1]?.toLowerCase() === 'help wanted' ? '<i class="fa-solid fa-life-ring"></i>' : issue.labels[1]?.toLowerCase() === 'documentation' ? '<i class="fa-solid fa-file"></i>' : '<i class="fa-solid fa-info-circle"></i>'}

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
        
        cardDiv.addEventListener('click', () => {
            modalBox.innerHTML = '';

            modalBox.innerHTML = `
                <!-- Header -->
                <h2 class="text-2xl font-semibold text-gray-800 mb-2">
                    ${issue.title}
                </h2>

                <!-- Meta -->
                <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span class="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                        ${issue.status}
                    </span>
                    <span>• Opened by ${issue.author}</span>
                    <span>• ${new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>

                <!-- Tags -->
                <div class="flex gap-2 mb-4">
                    <span class="${issue.labels[0] === undefined ? 'hidden' : 'flex'}  gap-1 justify-center items-center rounded-[100px] px-2 py-2 text-sm ${issue.labels[0]?.toLowerCase() === 'bug' ? 'bg-[#FEECEC] text-[#EF4444]' : issue.labels[0]?.toLowerCase() === 'help wanted' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#BBF7D0] text-[#00A96E]'} ">
                        ${issue.labels[0]?.toLowerCase() === 'bug' ? '<i class="fa-solid fa-bug"></i>' : issue.labels[0]?.toLowerCase() === 'help wanted' ? '<i class="fa-solid fa-life-ring"></i>' : issue.labels[0]?.toLowerCase() === 'documentation' ? '<i class="fa-solid fa-file"></i>' : '<i class="fa-solid fa-info-circle"></i>'}

                        ${issue.labels[0] || ''}
                    </span>
                    <span class="${issue.labels[1] === undefined ? 'hidden' : 'flex'}  gap-1 justify-center items-center rounded-[100px] px-2 py-2 text-sm ${issue.labels[1]?.toLowerCase() === 'bug' ? 'bg-[#FEECEC] text-[#EF4444]' : issue.labels[1]?.toLowerCase() === 'help wanted' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#BBF7D0] text-[#00A96E]'} ">
                        ${issue.labels[1]?.toLowerCase() === 'bug' ? '<i class="fa-solid fa-bug"></i>' : issue.labels[1]?.toLowerCase() === 'help wanted' ? '<i class="fa-solid fa-life-ring"></i>' : issue.labels[1]?.toLowerCase() === 'documentation' ? '<i class="fa-solid fa-file"></i>' : '<i class="fa-solid fa-info-circle"></i>'}

                        ${issue.labels[1] || ''}    
                    </span>
                </div>

                <!-- Description -->
                <p class="text-gray-600 mb-6">
                    ${issue.description}
                </p>

                <!-- Footer -->
                <div class="flex justify-between items-center bg-gray-100 shadow-sm p-4">

                    <!-- Assignee -->
                    <div>
                        <p class="text-sm text-gray-500">Assignee:</p>
                        <p class="font-semibold text-gray-800">${issue.assignee}</p>
                    </div>

                    <!-- Priority -->
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Priority:</p>
                        <span class="${issue.priority.toLowerCase() === 'high' ? 'bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold' : issue.priority.toLowerCase() === 'medium' ? 'bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold' : 'bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold'}">
                            ${issue.priority}
                        </span>
                    </div>
                
                </div>

                <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary px-4 py-2 rounded-md text-white hover:bg-red-600 hover:border-none outline-none hover:outline-none">Close</button>
                </form>
            </div>
                `;

            

            return my_modal_5.showModal()
        });
    });
};

allBtn.addEventListener('click', () => {
    container.classList.add('hidden');
    loader.classList.remove('hidden');
    setTimeout(() => {
        loader.classList.add('hidden');
        container.classList.remove('hidden');
        highlighter('allBtn');
        renderIssues(allFetchedIssues);

    }, 100);

});

openBtn.addEventListener('click', () => {
    container.classList.add('hidden');
    loader.classList.remove('hidden');
    const openIssues = allFetchedIssues.filter(issue => issue.status.toLowerCase() === 'open');
    setTimeout(() => {
        loader.classList.add('hidden');
        container.classList.remove('hidden');
        highlighter('openBtn');
        renderIssues(openIssues);
    }, 100);

});

closedBtn.addEventListener('click', () => {
    container.classList.add('hidden');
    loader.classList.remove('hidden');
    const closedIssues = allFetchedIssues.filter(issue => issue.status.toLowerCase() !== 'open');
    setTimeout(() => {
        loader.classList.add('hidden');
        container.classList.remove('hidden');
        highlighter('closedBtn');
        renderIssues(closedIssues);
    }, 100);

});

logoutBtn.addEventListener('click', () => logout());
searchBtn.addEventListener('click', () => srcNewIssue());
searchBox.addEventListener('keydown', () => srcNewIssue());



const loadAllIssues = async () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Something went wrong ${res.status}`)
        }
        const data = await res.json();
        allFetchedIssues = data.data;
        renderIssues(allFetchedIssues);
        loader.classList.add('hidden');
    }
    catch (error) {
        console.error('Error:', error.message);
        loader.classList.add('hidden');
        container.innerHTML = '<p class="text-red-500 font-bold text-center">No issues found.</p>';
    }
}

const highlighter = (btnId) => {
    btnsId.forEach(id => {
        if (btnId === id) {
            document.getElementById(id).classList.add('btn-primary');
        }
        else {
            document.getElementById(id).classList.remove('btn-primary');
        }

    })

}

const logout = () => {
    window.location.href = 'index.html';
}

const fetchSrcIssue = async (srcText) => {
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${srcText}`);
        if (!res.ok) {
            throw new Error('something went wrong', res.status);

        }
        const issues = await res.json();
        renderIssues(issues.data);
    }

    catch (error) {
        console.log('error', error.message);
        container.innerHTML = '<p class="text-red-500 font-bold text-center">No issues found.</p>';
    }

}


const srcNewIssue = () => {
    const searchText = searchBox.value.toLowerCase().trim();
    fetchSrcIssue(searchText);


}



loadAllIssues();
