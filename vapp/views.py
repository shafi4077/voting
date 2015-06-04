from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from vapp.models import Item,Vote
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.contrib import messages

@login_required
def home(request,pk=None):
    if pk:
        # delete item
        if request.user.username == 'arun':
            Item.objects.filter(id=pk).delete()
        return HttpResponseRedirect(reverse('home'))
    if request.method == "POST":
        # add new item
        txt = request.POST.get('item')
        if len(txt)>9: 
            Item(title=txt).save()
            messages.add_message(request, messages.SUCCESS, 'Item added successfully.')
        else: 
            messages.add_message(request, messages.WARNING, 'Item title must have atleast 10 characters.')
        return HttpResponseRedirect(reverse('home'))

    # show items
    annotated_items = []
    for item in Item.objects.filter(played=False):        
        c,me = 0,False
        for vote in item.votes.all():            
            c += vote.int_flag
            if vote.user == request.user: me=vote.flag
        annotated_items.append({'id':item.id,'title':item.title,'vcount':c,'voted':me})
    return render(request,'home.html',{'items' :annotated_items,'played':Item.objects.filter(played=True)})

@login_required
def vote_item(request):
    t,item = request.GET['t'],request.GET['item']
    v,created= Vote.objects.get_or_create(item_id=item, user=request.user)
    if created or (v.flag != t): 
        v.flag=t 
        v.save()
        #return HttpResponse("t")
    else:v.delete()
    return HttpResponseRedirect(reverse('home')) #return HttpResponse("f")


def played_item(request,pk):
    #print pk
    if request.user.username == 'arun':
        item = Item.objects.get(pk=pk)   
        item.played = True
        item.save()
    return HttpResponseRedirect(reverse('home'))