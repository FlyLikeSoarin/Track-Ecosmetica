from .models import History


def add_to_history(product, user):
    if History.objects.filter(product=product, user=user).exists():
        History.objects.filter(product=product, user=user).delete()
    entry = History.objects.create(product=product, user=user)
    return entry
