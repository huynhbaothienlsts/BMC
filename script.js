const state = JSON.parse(localStorage.getItem("bmcLearning") || "{}");
const checkpoints = ["studybuddy","whyDone","bmcDone","grabDone","challengeDone","quizDone"];

function saveState(){ localStorage.setItem("bmcLearning", JSON.stringify(state)); updateProgress(); }
function updateProgress(){
  const done = checkpoints.filter(k => state[k]).length;
  const pct = Math.round(done/checkpoints.length*100);
  document.querySelector("#progressBar").style.width = pct+"%";
  document.querySelector("#progressText").textContent = pct+"%";
  document.querySelectorAll(".checkpoint").forEach(btn=>{
    if(state[btn.dataset.key]){btn.classList.add("done");btn.textContent="✓ Đã hoàn thành";}
  });
  const badge=document.querySelector("#badge");
  if(done===checkpoints.length){
    badge.className="badge unlocked";
    badge.textContent="🏆 BMC EXPLORER – Bạn đã hoàn thành hành trình!";
  }
}
updateProgress();

document.querySelector("#themeBtn").onclick=()=>document.body.classList.toggle("dark");

document.querySelectorAll(".choice-row .choice").forEach(btn=>{
  btn.onclick=()=>{
    const row=btn.parentElement, feedback=row.nextElementSibling;
    row.querySelectorAll("button").forEach(x=>x.classList.remove("correct","wrong"));
    if(btn.dataset.correct==="true"){
      btn.classList.add("correct");
      feedback.textContent="Chính xác. Một ý tưởng hay chưa đủ; ta còn phải hiểu khách hàng, giá trị, kênh, doanh thu, chi phí...";
      state.studybuddy=true; saveState();
    }else{
      btn.classList.add("wrong");
      feedback.textContent="Hãy thử lại: chỉ từ mô tả ý tưởng, chúng ta chưa biết mô hình có hoạt động được hay không.";
    }
  };
});

document.querySelectorAll(".checkpoint").forEach(btn=>{
  btn.onclick=()=>{ state[btn.dataset.key]=true; saveState(); };
});

const bmc = {
 customers:{title:"1. Phân khúc khách hàng",q:"Chúng ta phục vụ ai?",text:"Xác định nhóm khách hàng mục tiêu thật cụ thể. Có thể phân theo nhu cầu, hành vi, nhân khẩu học, sở thích hoặc địa lý.",ex:"Ví dụ: không chỉ 'học sinh', mà là 'học sinh THPT thường xuyên quên deadline và có nhiều bài tập cùng lúc'."},
 value:{title:"2. Giá trị cung cấp",q:"Tại sao khách hàng chọn chúng ta?",text:"Giải quyết một vấn đề hoặc đáp ứng nhu cầu. Giá trị có thể là tốt hơn, nhanh hơn, tiện hơn, rẻ hơn hoặc tạo trải nghiệm tốt hơn.",ex:"Công thức: Chúng tôi giúp [KHÁCH HÀNG] giải quyết [VẤN ĐỀ] bằng [GIÁ TRỊ/GIẢI PHÁP]."},
 channels:{title:"3. Kênh tiếp cận",q:"Khách hàng biết, mua và nhận giá trị qua đâu?",text:"Kênh có thể trực tiếp, gián tiếp, kỹ thuật số hoặc hỗn hợp.",ex:"Ví dụ: app, website, mạng xã hội, cửa hàng, đại lý, trường học."},
 revenue:{title:"4. Dòng doanh thu",q:"Tiền đến từ đâu?",text:"Xác định ai trả tiền, trả cho giá trị nào và trả theo cơ chế nào.",ex:"Ví dụ: bán sản phẩm, phí sử dụng, thuê bao, commission, quảng cáo."},
 relationships:{title:"5. Quan hệ khách hàng",q:"Thu hút và giữ khách hàng thế nào?",text:"Thiết kế cách doanh nghiệp hỗ trợ và duy trì mối quan hệ với từng nhóm khách hàng.",ex:"Ví dụ: hỗ trợ cá nhân, self-service, tự động hóa, cộng đồng, loyalty."},
 activities:{title:"6. Hoạt động chính",q:"Chúng ta phải làm gì?",text:"Những việc quan trọng nhất để tạo và chuyển giao giá trị.",ex:"Ví dụ: phát triển sản phẩm, marketing, vận hành nền tảng, bán hàng, hỗ trợ khách hàng."},
 resources:{title:"7. Nguồn lực chính",q:"Chúng ta cần gì?",text:"Các tài sản thiết yếu để mô hình hoạt động.",ex:"Ví dụ: con người, công nghệ, dữ liệu, thương hiệu, thiết bị, vốn, tài sản trí tuệ."},
 partners:{title:"8. Đối tác chính",q:"Ai giúp chúng ta?",text:"Các cá nhân/tổ chức bên ngoài hỗ trợ nguồn lực, thị trường, công nghệ hoặc giảm rủi ro.",ex:"Ví dụ: nhà cung cấp, đối tác thanh toán, phân phối, công nghệ, đối tác chiến lược."},
 costs:{title:"9. Cơ cấu chi phí",q:"Tiền đi đâu?",text:"Những khoản chi quan trọng nhất để mô hình hoạt động.",ex:"Ví dụ: nhân sự, công nghệ, nguyên liệu, marketing, mặt bằng, vận hành."}
};
const seen=new Set();
document.querySelectorAll("[data-bmc]").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll("[data-bmc]").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active"); const d=bmc[btn.dataset.bmc]; seen.add(btn.dataset.bmc);
    document.querySelector("#bmcDetail").innerHTML=`<h3>${d.title}</h3><p><b>${d.q}</b></p><p>${d.text}</p><p class="micro">${d.ex}</p>`;
    if(seen.size===9){state.bmcDone=true;saveState();}
  };
});

const grabValues={
 user:"👤 Người dùng: tiện lợi, nhanh chóng, nhiều dịch vụ trong một ứng dụng.",
 driver:"🚗 Tài xế / đối tác giao hàng: cơ hội tạo thu nhập linh hoạt.",
 merchant:"🍜 Nhà hàng / Merchant: tiếp cận khách hàng, tăng doanh số và có công cụ hỗ trợ kinh doanh."
};
document.querySelectorAll("[data-side]").forEach(btn=>btn.onclick=()=>document.querySelector("#grabValue").textContent=grabValues[btn.dataset.side]);
document.querySelector("#networkAnswer").value=state.networkAnswer||"";
document.querySelector("#networkSave").onclick=()=>{state.networkAnswer=document.querySelector("#networkAnswer").value;state.grabDone=true;saveState();};

const form=document.querySelector("#startupForm");
const fields=[...form.querySelectorAll("input,textarea")];
const saved=state.startup||{};
fields.forEach(f=>{ if(saved[f.name]) f.value=saved[f.name]; f.addEventListener("input",saveForm);});
function saveForm(){ const obj={};fields.forEach(f=>obj[f.name]=f.value);state.startup=obj;saveState();}
document.querySelectorAll("[data-seed]").forEach(btn=>btn.onclick=()=>{const p=form.elements.problem;if(!p.value)p.value=`Một vấn đề liên quan đến ${btn.dataset.seed.toLowerCase()}: `;p.focus();saveForm();});
document.querySelector("#clearBtn").onclick=()=>{ if(confirm("Xóa toàn bộ dữ liệu Startup Challenge?")){fields.forEach(f=>f.value="");state.startup={};saveState();document.querySelector("#studentCanvas").classList.add("hidden");}};
document.querySelector("#previewBtn").onclick=renderStudentCanvas;

function renderStudentCanvas(){
  saveForm(); const d=state.startup||{};
  const parts=[
    ["Đối tác chính",d.partners],["Hoạt động chính",d.activities],["Nguồn lực chính",d.resources],
    ["Giá trị",d.value],["Quan hệ khách hàng",d.relationships],["Kênh",d.channels],
    ["Khách hàng",d.customer],["Chi phí",d.costs],["Doanh thu",d.revenue]
  ];
  const box=document.querySelector("#studentCanvas");
  box.innerHTML=parts.map(x=>`<div class="mini"><b>${x[0]}</b><span>${escapeHtml(x[1]||"Chưa điền")}</span></div>`).join("");
  box.classList.remove("hidden");
}
function escapeHtml(s){return (s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}

document.querySelectorAll(".stress-grid button").forEach(btn=>btn.onclick=()=>btn.classList.toggle("selected"));
document.querySelector("#stressAnswer").value=state.stressAnswer||"";
document.querySelector("#stressAnswer").addEventListener("input",e=>{state.stressAnswer=e.target.value;saveState();});

document.querySelector("#buildPitch").onclick=()=>{
  saveForm(); const d=state.startup||{};
  const out=`🎤 ${d.name||"STARTUP CỦA CHÚNG TÔI"}

👤 Khách hàng của chúng tôi là: ${d.customer||"..."}
😣 Họ gặp vấn đề: ${d.problem||"..."}
❤️ Chúng tôi mang lại: ${d.value||"..."}
📣 Họ biết đến chúng tôi qua: ${d.channels||"..."}
💰 Chúng tôi kiếm tiền bằng: ${d.revenue||"..."}
🚀 Điều đặc biệt của chúng tôi là: ${d.value||"..."}`;
  document.querySelector("#pitchOutput").textContent=out;
  state.challengeDone=true; saveState();
};

const quiz=[
 {q:"BMC hữu ích nhất vì điều gì?",opts:["Giúp startup dự đoán chắc chắn tương lai","Cho cái nhìn tổng thể và dễ thay đổi giả định","Thay thế hoàn toàn Business Plan"],a:1},
 {q:"Điểm khởi đầu được nhấn mạnh trong bài là gì?",opts:["Tạo app trước","Khách hàng và vấn đề","Tìm nhà đầu tư trước"],a:1},
 {q:"Ô nào trả lời câu hỏi 'Tại sao khách hàng chọn bạn?'",opts:["Value Proposition","Key Partners","Cost Structure"],a:0},
 {q:"Revenue Streams khác Cost Structure thế nào?",opts:["Revenue = tiền đến; Cost = tiền đi","Revenue = lợi nhuận; Cost = doanh thu","Hai ô giống nhau"],a:0},
 {q:"Nếu một thay đổi ở Key Partners làm Channels bị ảnh hưởng, điều này minh họa điều gì?",opts:["Các ô BMC độc lập","BMC chỉ dùng cho công ty lớn","9 ô BMC có liên kết với nhau"],a:2}
];
const quizBox=document.querySelector("#quizBox");
quizBox.innerHTML=quiz.map((q,i)=>`<div class="quiz-q"><b>${i+1}. ${q.q}</b><div class="quiz-options">${q.opts.map((o,j)=>`<button data-q="${i}" data-o="${j}">${o}</button>`).join("")}</div></div>`).join("");
let answers={};
quizBox.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{
  const qi=+btn.dataset.q, oi=+btn.dataset.o;
  answers[qi]=oi;
  btn.parentElement.querySelectorAll("button").forEach(x=>x.classList.remove("correct","wrong"));
  btn.classList.add(oi===quiz[qi].a?"correct":"wrong");
  if(Object.keys(answers).length===quiz.length){
    const score=quiz.filter((q,i)=>answers[i]===q.a).length;
    document.querySelector("#quizResult").textContent=`Kết quả: ${score}/5 ${score>=4?"🎉 Rất tốt!":"— Hãy xem lại các phần còn chưa chắc."}`;
    if(score>=4){state.quizDone=true;saveState();}
  }
});
