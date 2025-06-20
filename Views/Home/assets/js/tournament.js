(function(){
    async function load(){
        const r = await fetch('/api/tournaments');
        return await r.json();
    }
    async function render(){
        const list = await load();
        const c = $('#tournamentList').empty();
        list.forEach(t=>{
            c.append(`
<div class="col-lg-6 fade-slide bottom mb-4">
    <div class="single-tournament-2">
        <img class="bg-img" src="assets/img/tournament/bg-3.png" alt="img">
        <div class="content-area">
            <div class="top-area d-flex align-items-center align-self-center">
                <img class="me-3 main-img" src="${t.imageUrl}" alt="img">
                <div class="details">
                    <h6>Action</h6>
                    <h4 class="mb-0">${t.name}</h4>
                </div>
                ${auth.isAdmin()?`<button class='btn btn-danger btn-sm ms-auto' data-id='${t.id}'>Удалить</button>`:''}
            </div>
            <span class="line-shadow"></span>
            <div class="bottom-area">
                <div class="row">
                    <div class="col-4">
                        <span>PRIZE</span><br>
                        <span class="color-base">${t.prize}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);
        });
    }
    $(document).on('submit','#addTournamentForm',async function(e){
        e.preventDefault();
        await fetch('/api/tournaments',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:$('#tourName').val(),prize:$('#tourPrize').val(),imageUrl:$('#tourImage').val()})
        });
        render();
        this.reset();
    });
    $(document).on('click','#tournamentList .btn-danger',async function(){
        const id=$(this).data('id');
        await fetch('/api/tournaments/'+id,{method:'DELETE'});
        render();
    });
    $(function(){
        if(auth.isAdmin()) $('#addTournamentForm').show();
        render();
    });
})();
