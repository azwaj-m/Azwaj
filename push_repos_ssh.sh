#!/bin/bash

# جن فولڈرز کو گٹ ہب پر پرائیویٹ ریپوز بنا کر پش کرنا ہے
REPOS=("Alingo-Aashiyana" "FileLock" "BvR" "Alingo_studio" "Admin" "Azwaj")

for repo in "${REPOS[@]}"; do
    if [ -d "$repo" ]; then
        echo "=========================================="
        echo "Processing repository: $repo"
        echo "=========================================="
        
        cd "$repo" || continue
        
        # اگر .git موجود نہیں تو انیشیات کریں
        if [ ! -d ".git" ]; then
            git init
            git branch -M main
        fi
        
        # اگر .gitignore موجود نہیں تو بنیادی بنا دیں
        if [ ! -f ".gitignore" ]; then
            echo -e "node_modules/\ndist/\nbuild/\n.env\n*.log" > .gitignore
        fi
        
        git add -A
        
        # اگر کوئی تبدیلیاں یا کمٹ کرنے والی فائلیں ہوں تو کمٹ کریں
        git commit -m "Initial automated commit for $repo via SSH" || echo "Nothing to commit for $repo"
        
        # گٹ ہب پر پرائیویٹ ریپوزٹری بنائیں اور SSH کے ذریعے پش کریں
        gh repo create "$repo" --private --source=. --remote=origin --push
        
        cd ..
        echo "Successfully pushed $repo to GitHub via SSH!"
        echo ""
    else
        echo "Directory $repo not found!"
    fi
done

echo "All eligible repositories processed successfully!"
