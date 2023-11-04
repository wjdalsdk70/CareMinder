GROUPS = {
    "SECRETARY": [
        "add_staff",
        "view_staff",
        "change_staff",
        "delete_staff",
        "add_patient",
        "view_patient",
        "change_patient",
        "delete_patient",
        "add_tablet",
        "view_tablet",
        "change_tablet",
        "delete_tablet",
        "add_request",
        "view_request",
        "change_request",
        "delete_request",
    ],
    "HELPER": [
        "view_patient",
        "change_patient",
        "add_request",
        "view_request",
        "change_request",
        "delete_request",
    ],
    "NURSE": [
        "view_patient",
        "change_patient",
        "add_request",
        "view_request",
        "change_request",
        "delete_request",
    ],
    "DOCTOR": [
        "view_patient",
        "change_patient",
        "add_request",
        "view_request",
        "change_request",
        "delete_request",
    ],
}


def populate_models(sender, **kwargs):
    from django.contrib.auth.models import Group, Permission
    from django.contrib.contenttypes.models import ContentType

    # for group_name, permissions in GROUPS.items():
    #     group, created = Group.objects.get_or_create(name=group_name)
    #     if created:
    #         for perm in permissions:
    #             action, model_name = perm.split("_")
    #             try:
    #                 perm = Permission.objects.get(
    #                     codename=f"{action}_{model_name}",
    #                 )
    #                 group.permissions.add(perm)
    #             except Permission.DoesNotExist:
    #                 pass
