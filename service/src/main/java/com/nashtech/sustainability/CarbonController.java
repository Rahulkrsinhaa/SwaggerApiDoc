package com.nashtech.sustainability;


import com.example.model.CarbonEmitterItemResponse;
import com.example.model.CategoryEnum;
import com.example.model.ScopeEnum;
import com.example.model.TypeEnum;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carbon")
public class CarbonController {

    @GetMapping("/item")
    public CarbonEmitterItemResponse getItem() {
        CarbonEmitterItemResponse item = new CarbonEmitterItemResponse();
        item.setScope(ScopeEnum.SCOPE1);
        item.setCategory(CategoryEnum.CATEGORY_A);
        item.setType(TypeEnum.TYPE_X);
        item.setName("Example Item");
        return item;
    }

    @PostMapping("/item")
    public CarbonEmitterItemResponse createItem(@RequestBody CarbonEmitterItemResponse item) {
        return item;
    }
}